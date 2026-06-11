import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    env_vars: {
      GA4_SERVICE_ACCOUNT_JSON: process.env.GA4_SERVICE_ACCOUNT_JSON ? '✅ SET' : '❌ NOT SET',
      BIGQUERY_PROJECT_ID: process.env.BIGQUERY_PROJECT_ID ? '✅ SET' : '❌ NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    },
    message: 'Check if environment variables are configured',
  });
}
