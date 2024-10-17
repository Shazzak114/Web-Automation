const { By, Builder, until } = require("selenium-webdriver");

async function test() {
    const driver = await new Builder().forBrowser("chrome").build();
    driver.manage().setTimeouts({ implicit: 25000 });

    try {
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.css("input[placeholder='Username']")).sendKeys("locked_out_user");
        await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("secret_sauce");
        await driver.findElement(By.css("input[class='submit-button btn_action']")).click();

        const errorMessage = await driver.wait(until.elementLocated(By.css("h3[data-test='error']")), 5000);
        const messageText = await errorMessage.getText();
        console.log("Error Message:", messageText);

        if (messageText === 'Epic sadface: Sorry, this user has been locked out.') {
            console.log("Test Passed");
        } else {
            console.log("Test Failed");
        }

    } finally {
        await driver.quit();
    }
}

test();
