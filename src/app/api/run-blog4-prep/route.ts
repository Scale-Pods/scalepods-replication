import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import sharp from 'sharp';

export async function GET() {
  const docxPath = `C:\\Users\\hrish\\Downloads\\ScalePods AI Marketing Edge - Blog 4.docx`;
  const imgFolder = `C:\\Users\\hrish\\Downloads\\BLOG 4 ( AI Marketing Edge )-20260806T160538Z-1-001\\BLOG 4 ( AI Marketing Edge )`;
  const outTxtPath = path.join(process.cwd(), 'doc4_text.txt');
  const publicBlogDir = path.join(process.cwd(), 'public', 'images', 'blog');

  let extractedText = '';
  try {
    const buf = fs.readFileSync(docxPath);
    let offset = 0;
    let documentXmlBuffer: Buffer | null = null;

    while (offset < buf.length - 30) {
      if (buf[offset] === 0x50 && buf[offset+1] === 0x4b && buf[offset+2] === 0x03 && buf[offset+3] === 0x04) {
        const compMethod = buf.readUInt16LE(offset + 8);
        const compSize = buf.readUInt32LE(offset + 18);
        const fileNameLen = buf.readUInt16LE(offset + 26);
        const extraLen = buf.readUInt16LE(offset + 28);
        const fileName = buf.toString('utf8', offset + 30, offset + 30 + fileNameLen);
        
        const dataOffset = offset + 30 + fileNameLen + extraLen;
        
        if (fileName === 'word/document.xml') {
          const compressedData = buf.slice(dataOffset, dataOffset + compSize);
          if (compMethod === 8) {
            documentXmlBuffer = zlib.inflateRawSync(compressedData);
          } else if (compMethod === 0) {
            documentXmlBuffer = compressedData;
          }
          break;
        }
        offset = dataOffset + compSize;
      } else {
        offset++;
      }
    }

    if (documentXmlBuffer) {
      const xml = documentXmlBuffer.toString('utf8');
      const pMatches = xml.match(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g) || [];
      const paragraphs: string[] = [];
      for (const pXml of pMatches) {
        const tMatches = pXml.match(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g) || [];
        const textParts = tMatches.map(t => t.replace(/<[^>]+>/g, ''));
        if (textParts.length > 0) {
          paragraphs.push(textParts.join(''));
        }
      }
      extractedText = paragraphs.join('\n\n');
      fs.writeFileSync(outTxtPath, extractedText, 'utf-8');
    }
  } catch (e: any) {
    console.error("Docx Error:", e.message);
  }

  if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
  }

  const imagesToProcess = [
    { src: '1ST IMAGE(CANVA).png', out: 'mktg_edge_1.webp' },
    { src: '2ND IMAGE.png', out: 'mktg_edge_2.webp' },
    { src: '3RD  IMAGE .png', out: 'mktg_edge_3.webp' },
    { src: '4TH IMAGE .png', out: 'mktg_edge_4.webp' },
    { src: '5TH IMAGES.png', out: 'mktg_edge_5.webp' },
    { src: '6TH IMAGES.png', out: 'mktg_edge_6.webp' },
    { src: '7TH IMAGE .png', out: 'mktg_edge_7.webp' }
  ];

  const processed: string[] = [];
  for (const img of imagesToProcess) {
    const fullSrcPath = path.join(imgFolder, img.src);
    const fullOutPath = path.join(publicBlogDir, img.out);
    if (fs.existsSync(fullSrcPath)) {
      await sharp(fullSrcPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(fullOutPath);
      processed.push(img.out);
    }
  }

  return NextResponse.json({
    ok: true,
    textLength: extractedText.length,
    processedImages: processed
  });
}
