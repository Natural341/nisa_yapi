import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const merchant_oid = formData.get('merchant_oid') as string;
    const status = formData.get('status') as string;
    const total_amount = formData.get('total_amount') as string;
    const hash = formData.get('hash') as string;
    const failed_reason_code = formData.get('failed_reason_code') as string;
    const failed_reason_msg = formData.get('failed_reason_msg') as string;
    const test_mode = formData.get('test_mode') as string;
    const payment_type = formData.get('payment_type') as string;
    const currency = formData.get('currency') as string;
    const payment_amount = formData.get('payment_amount') as string;

    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '';
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || '';

    // Hash kontrolü
    const hashSTR = merchant_oid + merchant_salt + status + total_amount;
    const calculatedHash = crypto
      .createHmac('sha256', merchant_key)
      .update(hashSTR)
      .digest('base64');

    if (hash !== calculatedHash) {
      console.error('PayTR Hash mismatch!');
      return new NextResponse('OK', { status: 200 }); // PayTR'a OK dönmeliyiz
    }

    if (status === 'success') {
      // Ödeme başarılı - Burada sipariş veritabanına kaydedilir
      console.log('Payment successful:', {
        merchant_oid,
        total_amount,
        payment_type,
        currency,
      });

      // TODO: Veritabanına kaydet
      // - Sipariş durumunu güncelle
      // - Müşteriye email gönder
      // - Stok güncelle

      return new NextResponse('OK', { status: 200 });
    } else {
      // Ödeme başarısız
      console.error('Payment failed:', {
        merchant_oid,
        failed_reason_code,
        failed_reason_msg,
      });

      // TODO: Veritabanına kaydet (başarısız)

      return new NextResponse('OK', { status: 200 });
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    return new NextResponse('OK', { status: 200 }); // PayTR'a her zaman OK dönmeliyiz
  }
}

// PayTR callback sayfası için GET endpoint (kullanıcı yönlendirmesi)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const merchant_oid = searchParams.get('merchant_oid');

  if (status === 'success') {
    // Başarılı ödeme sonrası yönlendirme
    return NextResponse.redirect(
      new URL(`/odeme/basarili?order=${merchant_oid}`, request.url)
    );
  } else {
    // Başarısız ödeme sonrası yönlendirme
    return NextResponse.redirect(new URL('/odeme?status=failed', request.url));
  }
}
