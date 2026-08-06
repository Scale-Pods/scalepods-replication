import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { execSync } = require('child_process');

export async function GET() {
  const docPath = 'C:\\Users\\hrish\\Downloads\\ScalePods AI Marketing Edge - Blog 4.docx';
  
  const script = `
$zip = [System.IO.Compression.ZipFile]::OpenRead('${docPath}')
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = [xml]$reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$paragraphs = $xml.SelectNodes('//w:p', @{w='http://schemas.openxmlformats.org/wordprocessingml/2006/main'})
foreach ($p in $paragraphs) {
    $t = $p.SelectNodes('.//w:t', @{w='http://schemas.openxmlformats.org/wordprocessingml/2006/main'}) | ForEach-Object { $_.InnerText }
    if ($t) {
        [string]::Join('', $t)
    }
}
`;
  const psPath = path.join(process.cwd(), 'extract4.ps1');
  fs.writeFileSync(psPath, script, 'utf-8');

  try {
    const result = execSync('powershell -ExecutionPolicy Bypass -File extract4.ps1', { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
    const outPath = path.join(process.cwd(), 'doc4_text.txt');
    fs.writeFileSync(outPath, result, 'utf-8');
    return NextResponse.json({ ok: true, length: result.length, textSnippet: result.substring(0, 500) });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
