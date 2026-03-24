const calculateTotals = (items, taxPercent = 0) => {
  const normalizedItems = items.map((item) => {
    const quantity = Number(item.quantity);
    const price = Number(item.price);
    const lineTotal = quantity * price;

    return {
      name: item.name,
      quantity,
      price,
      lineTotal
    };
  });

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const taxAmount = (subtotal * Number(taxPercent || 0)) / 100;
  const total = subtotal + taxAmount;

  return {
    items: normalizedItems,
    subtotal,
    taxAmount,
    total
  };
};

export { calculateTotals };