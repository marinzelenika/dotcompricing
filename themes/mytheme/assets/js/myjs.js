fetch(
  "https://purchase-api.dynabic.com/v1.2/productFamily/site-aspose?isArchived=&pageNumber=&pageSize=&applyDisplayOrder=true&includeProducts=false&enabledPPPOn=&clientkey=a&signature=jc_xWmdMtA-nMA2Bgp9vuEV0Kn0"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((productFamily) => {
      let charges = "";
      fetch(
        "https://purchase-api.dynabic.com/v1.2/productFamily/site-aspose/name-" +
          productFamily.Name
      )
        .then((response) => response.json())
        .then((data) => {
          let productFamilyData = data.Products;
          productFamilyData.forEach((product) => {
            let productName = product.Name;
            product.PricingPlans.filter((plan) => plan.DisplayOrder > 0)
              .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
              .forEach((plan) => {
                plan.PaymentScheduleList.forEach((schedule) => {
                  charges += schedule.SubscriptionPeriodCharge + " ";
                });
              }); 
             /* document.getElementById(
              "product-names"
            ).innerHTML += `<h4>${productName}</h4>`; */
            document.getElementById(
              "product-pricing-plans"
            ).innerHTML += `<h5>${productName}</h5><p>${charges}</p>`;
            charges = ""; 
          });
        });
    });
  })
  .catch((error) => console.log(error));
