function addCandy(candyName, description, quantity, price) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  const descSpan = document.createElement("span");
  const quantitySpan = document.createElement("span");
  const priceSpan = document.createElement("span");
  const buyButton1 = document.createElement("button");
  const buyButton2 = document.createElement("button");
  const buyButton3 = document.createElement("button");

  nameSpan.innerText = candyName;
  descSpan.innerText = ` Description: ${description}`;
  quantitySpan.innerText = ` Quantity: ${quantity}`;
  priceSpan.innerText = ` Price: $${price.toFixed(2)}`;
  buyButton1.innerText = "Buy 1";
  buyButton2.innerText = "Buy 2";
  buyButton3.innerText = "Buy 3";

  let candyQuantity = quantity;

  buyButton1.addEventListener("click", function () {
    if (candyQuantity >= 1) {
      candyQuantity -= 1;
      updateCandyQuantity(candyName, candyQuantity);
      quantitySpan.innerText = `Quantity: ${candyQuantity}`;
      console.log("Bought 1", candyName);
    } else {
      console.log("Not enough quantity available!");
    }
  });

  buyButton2.addEventListener("click", function () {
    if (candyQuantity >= 2) {
      candyQuantity -= 2;
      updateCandyQuantity(candyName, candyQuantity);
      quantitySpan.innerText = `Quantity: ${candyQuantity}`;
      console.log("Bought 2", candyName);
    } else {
      console.log("Not enough quantity available!");
    }
  });

  buyButton3.addEventListener("click", function () {
    if (candyQuantity >= 3) {
      candyQuantity -= 3;
      updateCandyQuantity(candyName, candyQuantity);
      quantitySpan.innerText = `Quantity: ${candyQuantity}`;
      console.log("Bought 3", candyName);
    } else {
      console.log("Not enough quantity available!");
    }
  });

  li.appendChild(nameSpan);
  li.appendChild(descSpan);
  li.appendChild(quantitySpan);
  li.appendChild(priceSpan);
  li.appendChild(buyButton1);
  li.appendChild(buyButton2);
  li.appendChild(buyButton3);

  document.getElementById("candy").appendChild(li);
}

function updateCandyQuantity(candyName, newQuantity) {
  axios
    .patch(
      `https://crudcrud.com/api/783f6a08ee104fce9cd473355597bdc0/candy/${candyName}`,
      {
        quantity: newQuantity,
      }
    )
    .then((res) => {
      console.log("Quantity updated:", candyName, "New Quantity:", newQuantity);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getCandy() {
  axios
    .get("https://crudcrud.com/api/783f6a08ee104fce9cd473355597bdc0/candy")
    .then((res) => {
      const candyArr = res.data;
      candyArr.forEach((candy) => {
        addCandy(
          candy.candyName,
          candy.description,
          candy.quantity,
          candy.price
        );
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

document
  .getElementById("main-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let candyName = document.getElementById("candy-name").value;
    let description = document.getElementById("description").value;
    let quantity = parseInt(document.getElementById("quantity").value);
    let price = parseFloat(document.getElementById("price").value);

    axios
      .post("https://crudcrud.com/api/783f6a08ee104fce9cd473355597bdc0/candy", {
        candyName,
        description,
        quantity,
        price,
      })
      .then((res) => {
        const { candyName, description, quantity, price } = res.data;
        addCandy(candyName, description, quantity, price);
        console.log("Candy added:", candyName);
      })
      .catch((err) => {
        console.log(err);
      });
  });

getCandy();
