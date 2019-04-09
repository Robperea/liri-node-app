var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 8889,

    user: "root",
  
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    products();
  });
  

  function products() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('-------------Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id);
            console.log('Product: ' + res[i].product);
            console.log('Department: ' + res[i].department);
            console.log('Price: ' + res[i].price );
            console.log('Quantity Left: ' + res[i].quantity);
            console.log(' ');
            console.log(' ');

        }
    
        start();
    });
}


function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw console.log("connection error:" + err);
    inquirer
        .prompt([
                {
                    name: 'selectId',
                    type: 'input',
                    message: 'Enter the id number of item you want to purchase:',


        },

                {
                    name: 'amountBought',
                    type: 'input',
                    message: 'How many would you like?',
                    validate: function(value) {
                      if (isNaN(value) === false) {
                        return true;
                      }
                      return false;
                    }
                }
            ]).then (function (answers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                id: answers.selectId
            }, function (err, res) {

                var inStock = res[0].quantity;
                var itemBought = answers.amountBought;

                if (inStock >= itemBought) {
                    var leftInStock = inStock - itemBought;
                    
                    var totalPrice = res[0].price * itemBought;
                    var itemPurchased = res[0].product;
                    
                    console.log(totalPrice + "  total price of items bought");
                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [
                            {
                                quantity: leftInStock
                                
                        },
                            {
                                id: answers.selectId
                        }

                    ],
                        function (error) {

                            if (error) throw err;
                            console.log("==============================================");
                            console.log("\n\r");
                            console.log("Order details:");
                            console.log("Item bought " + itemPurchased);
                            console.log("Quantity bought " + itemBought + " for $" + res[0].price);
                            console.log("Total Cost: $" + totalPrice);
                            console.log("\n\r");
                            console.log("Thank you for shopping with us.");
                            console.log("==============================================");
                            products();

                        }
                    );
                } else {
                    console.log("==============================================");
                    console.log("\n\r");
                    console.log("Sorry, we don't have enough in stock.");
                    console.log("\n\r");
                    console.log("==============================================");
                   products();

                }

            });
        
        });
        });
    }