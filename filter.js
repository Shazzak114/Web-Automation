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
    driver.manage().setTimeouts({ implicit: 10000 });

    try {
        await driver.manage().window().maximize();
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.css("input[placeholder='Username']")).sendKeys("performance_glitch_user");
        await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("secret_sauce");
        await driver.findElement(By.css("input[class='submit-button btn_action']")).click();

        const burgerMenu = await driver.findElement(By.id("react-burger-menu-btn"));
        await waitForClickable(driver, burgerMenu);
        await waitForClickable(driver, await driver.findElement(By.id("reset_sidebar_link")));

        const sortDropdown = await driver.findElement(By.xpath("//select[contains(@class,'product_sort_container')]"));
        await waitForClickable(driver, sortDropdown);
        await driver.findElement(By.xpath("//option[@value='za']")).click();

        const firstProductAddButton = await driver.findElement(By.xpath("//div[@class='inventory_item'][1]//button"));
        await waitForClickable(driver, firstProductAddButton);

        const cartLink = await driver.findElement(By.css("a.shopping_cart_link"));
        await waitForClickable(driver, cartLink);

        const checkoutButton = await driver.findElement(By.css("button.btn_action.btn_medium.checkout_button"));
        await waitForClickable(driver, checkoutButton);

        await driver.findElement(By.css("input[placeholder='First Name']")).sendKeys("Mr.");
        await driver.findElement(By.css("input[placeholder='Last Name']")).sendKeys("Shamim");
        await driver.findElement(By.css("input[placeholder='Zip/Postal Code']")).sendKeys("83625");
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
