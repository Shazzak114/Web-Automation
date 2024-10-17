const { By, Builder } = require("selenium-webdriver");

async function waitForClickable(driver, element, timeout = 10000) {
    await driver.wait(async () => {
        try {
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) {
                await element.click();
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }, timeout);
}

async function test() {
    const driver = await new Builder().forBrowser("chrome").build();
    driver.manage().setTimeouts({ implicit: 25000 });

    try {
        await driver.manage().window().maximize();
        await driver.get("https://www.saucedemo.com/");

        await driver.findElement(By.css("input[placeholder='Username']")).sendKeys("standard_user");
        await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("secret_sauce");
        await driver.findElement(By.css("input[class='submit-button btn_action']")).click();

        const burgerMenu = await driver.findElement(By.id("react-burger-menu-btn"));
        await waitForClickable(driver, burgerMenu);
        await waitForClickable(driver, await driver.findElement(By.id("reset_sidebar_link")));

        const addToCartButtons = await driver.findElements(By.xpath("//button[contains(text(),'Add to cart')]"));
        for (let i = 0; i < 3; i++) {
            await waitForClickable(driver, addToCartButtons[i]);
        }

        const cartLink = await driver.findElement(By.css("a.shopping_cart_link"));
        await waitForClickable(driver, cartLink);

        const checkoutButton = await driver.findElement(By.css("button.btn_action.btn_medium.checkout_button"));
        await waitForClickable(driver, checkoutButton);

        const firstNameField = await driver.findElement(By.css("input[placeholder='First Name']"));
        await firstNameField.sendKeys("Mr.");
        await driver.findElement(By.css("input[placeholder='Last Name']")).sendKeys("Shamim");
        await driver.findElement(By.css("input[placeholder='Zip/Postal Code']")).sendKeys("6757");
        await driver.findElement(By.css("input[type='submit']")).click();

        const finishButton = await driver.findElement(By.xpath("//button[contains(@class,'btn_action btn_medium cart_button')]"));
        await waitForClickable(driver, finishButton);

        await waitForClickable(driver, burgerMenu);
        const backHomeButton = await driver.findElement(By.xpath("//button[contains(.,'Back Home')]"));
        await waitForClickable(driver, backHomeButton);

        await waitForClickable(driver, burgerMenu);
        const resetLinkAgain = await driver.findElement(By.id("reset_sidebar_link"));
        await waitForClickable(driver, resetLinkAgain);

        await waitForClickable(driver, burgerMenu);
        const logoutLink = await driver.findElement(By.id("logout_sidebar_link"));
        await waitForClickable(driver, logoutLink);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}

test();
