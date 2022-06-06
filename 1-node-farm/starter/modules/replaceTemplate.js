module.exports = (element, template) => {
  // replace the place holder in the template with the equivalent value from the element attributes
  // the out put will contain a shallow copy of the template
  // a good practice is to replace in the copy and not in the actual template
  let output = template.replace(/{%IMAGE%}/g, element.image);
  // so we use the the copy to replace the other elements from now on
  output = output.replace(/{%PRODUCT_NAME%}/g, element.productName);
  output = output.replace(/{%QUANTITY%}/g, element.quantity);
  output = output.replace(/{%PRICE%}/g, element.price);
  output = output.replace(/{%ID%}/g, element.id);

  output = output.replace(/{%From%}/g, element.from);
  output = output.replace(/{%NUTRIENTS%}/g, element.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, element.description);

  if (!element.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
