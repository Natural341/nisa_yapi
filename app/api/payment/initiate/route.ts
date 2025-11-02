import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_name,
      user_address,
      user_phone,
      user_email,
      merchant_oid,
      payment_amount,
      user_basket,
      user_ip,
    } = body;

    // PayTR credentials - bunları environment variables'dan alın
    const merchant_id = process.env.PAYTR_MERCHANT_ID || '';
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || '';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '';

    if (!merchant_id || !merchant_key || !merchant_salt) {
      return NextResponse.json(
        { error: 'PayTR configuration is missing' },
        { status: 500 }
      );
    }

    // PayTR için gerekli parametreler
    const payment_amount_str = (payment_amount * 100).toString(); // Kuruş cinsine çevir
    const max_installment = '9'; // Maksimum taksit sayısı
    const currency = 'TL';
    const test_mode = process.env.PAYTR_TEST_MODE === 'true' ? '1' : '0';
    const no_installment = '0';
    const lang = 'tr';
    const merchant_ok_url = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`;
    const merchant_fail_url = `${process.env.NEXT_PUBLIC_APP_URL}/odeme?status=failed`;
    const timeout_limit = '30';
    const debug_on = test_mode;

    // PayTR token oluşturma
    const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${user_email}${payment_amount_str}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;
    const paytr_token = hashSTR + merchant_salt;
    const token = crypto
      .createHmac('sha256', merchant_key)
      .update(paytr_token)
      .digest('base64');

    // PayTR'a gönderilecek data
    const params = new URLSearchParams({
      merchant_id,
      user_ip,
      merchant_oid,
      email: user_email,
      payment_amount: payment_amount_str,
      paytr_token: token,
      user_basket,
      debug_on,
      no_installment,
      max_installment,
      user_name,
      user_address,
      user_phone,
      merchant_ok_url,
      merchant_fail_url,
      timeout_limit,
      currency,
      test_mode,
      lang,
    });

    // PayTR API'ye istek gönder
    const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return NextResponse.json({
        success: true,
        token: data.token,
      });
    } else {
      return NextResponse.json(
        { error: data.reason || 'Payment initiation failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
