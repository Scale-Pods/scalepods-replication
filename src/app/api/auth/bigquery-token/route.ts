import { NextResponse } from 'next/server';
import { createSign } from 'crypto';

export const revalidate = 0; // No caching
export const dynamic = 'force-dynamic'; // Force dynamic rendering

export async function GET() {
  try {
    // Get service account from environment
    const serviceAccountJson = process.env.GA4_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      console.error('[bigquery-token] ERROR: GA4_SERVICE_ACCOUNT_JSON not set');
      return NextResponse.json(
        { error: 'GA4_SERVICE_ACCOUNT_JSON not configured' },
        { status: 500 }
      );
    }

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountJson);
    } catch (e) {
      console.error('[bigquery-token] ERROR: Failed to parse GA4_SERVICE_ACCOUNT_JSON', e);
      return NextResponse.json(
        { error: 'Invalid GA4_SERVICE_ACCOUNT_JSON format' },
        { status: 500 }
      );
    }

    // Step 1: Create JWT
    const now = Math.floor(Date.now() / 1000);
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    const payload = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/bigquery',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    // Helper to base64url encode
    const base64url = (str: string): string => {
      return Buffer.from(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };

    const headerEncoded = base64url(JSON.stringify(header));
    const payloadEncoded = base64url(JSON.stringify(payload));
    const signatureInput = `${headerEncoded}.${payloadEncoded}`;

    // Sign with private key
    const signature = createSign('RSA-SHA256')
      .update(signatureInput)
      .sign(
        {
          key: serviceAccount.private_key,
          format: 'pem',
        },
        'base64'
      )
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    const jwt = `${signatureInput}.${signature}`;

    // Step 2: Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }).toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: 'Failed to obtain access token', details: tokenData },
        { status: 500 }
      );
    }

    // Return token with 1-hour cache control
    return NextResponse.json(
      { access_token: tokenData.access_token },
      {
        headers: {
          'Cache-Control': 'private, max-age=3400', // Expires before token (3600s)
        },
      }
    );
  } catch (error) {
    console.error('[/api/auth/bigquery-token] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate token',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
