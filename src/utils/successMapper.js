const formatSummary = summary => {
  const base = Number(summary?.baseAmount ?? summary?.serviceFee ?? 0);
  const gst = Number(summary?.gstAmount ?? 0);
  const total = Number(summary?.totalAmount ?? base + gst);
  return {
    serviceFee: base,
    gstAmount: gst,
    totalAmount: total,
  };
};

export const buildProductSuccessParams = ({
  orderResponse = {},
  orderRequest = {},
  summary = {},
  items = [],
}) => {
  const normalizedResponse = orderResponse?.data ?? orderResponse ?? {};
  const orderDetails = normalizedResponse?.order ?? normalizedResponse ?? {};
  const normalizedSummary = formatSummary(summary);
  const primaryItem = Array.isArray(items) && items.length ? items[0] : null;
  const paymentType =
    orderRequest?.paymentType ?? orderRequest?.paymentMethod ?? 'UPI';
  const paymentDetails =
    orderRequest?.paymentDetails ??
    orderDetails?.paymentDetails ??
    {};

  const mappedRequest = {
    ...orderRequest,
    paymentType,
    paymentId:
      orderRequest?.paymentId ?? paymentDetails?.transactionId ?? null,
  };

  const bookedServiceItem = primaryItem
    ? {
        originalPrice:
          primaryItem?.totalPrice ?? primaryItem?.price ?? primaryItem?.mrpPrice,
        totalPrice:
          primaryItem?.totalPrice ?? primaryItem?.price ?? primaryItem?.sellingPrice,
      }
    : null;

  return {
    bookingDetails: {
      date: new Date().toISOString(),
    },
    bookingResponse: normalizedResponse,
    bookedServiceItem,
    pricingSummary: normalizedSummary,
    orderResponse: normalizedResponse,
    orderRequest: mappedRequest,
  };
};

export const buildSuccessScreenData = rawParams => {
  const {
    bookingDetails = {},
    bookingResponse = {},
    bookedServiceItem = null,
    pricingSummary = {},
    orderResponse = {},
    orderRequest = {},
  } = rawParams || {};

  const normalizedResponse =
    orderResponse?.data ?? orderResponse ?? {};
  const orderDetails =
    normalizedResponse?.order ?? normalizedResponse ?? {};
  if (orderDetails?.finalAmount == null) {
    const computedTotal =
      Number(summary?.totalAmount) ||
      Number(orderDetails?.totalAmount) ||
      0;
    orderDetails.finalAmount = computedTotal;
  }
  const transaction =
    normalizedResponse?.transaction ?? {};

  const transactionRaw =
    orderDetails?._id ??
    orderDetails?.paymentDetails?.transactionId ??
    bookingResponse?.transactionId ??
    bookingResponse?.paymentId ??
    bookingResponse?.referenceId ??
    transaction?.transactionId ??
    transaction?.paymentId ??
    '';

  const transactionId = transactionRaw
    ? String(transactionRaw).slice(-8)
    : '';

  const totalPaidAmount =
    Number(
        orderDetails?.finalAmount ??
        orderDetails?.payingAmount ??
        orderDetails?.totalAmount ??
        pricingSummary?.totalAmount ??
        bookingResponse?.grandtotal ??
        bookingResponse?.grandTotal ??
        0,
    ) || 0;

  return {
    bookingDetails,
    bookingResponse,
    bookedServiceItem,
    pricingSummary,
    orderResponse: normalizedResponse,
    orderRequest,
    orderDetails,
    transactionId,
    transactionIdCopySource: transactionRaw,
    totalPaidAmount,
  };
};
