package automation;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.*;

public class RegistrationTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "C:\\chromedriver\\chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    public void submitWithoutLastName_shouldShowError() throws Exception {

        // 1. Launch page
        driver.get("file:///D:/work%20stuff/registration-form/index.html");

        // 2. Print URL & Title
        System.out.println("URL: " + driver.getCurrentUrl());
        System.out.println("Title: " + driver.getTitle());

        // 3. Fill form (Last Name skipped)
        driver.findElement(By.id("firstname")).sendKeys("Shivansh");
        driver.findElement(By.id("email")).sendKeys("shivansh@gmail.com");

        Select country = new Select(driver.findElement(By.id("country")));
        country.selectByValue("in");
        Thread.sleep(800);

        Select state = new Select(driver.findElement(By.id("state")));
        state.selectByValue("dl");
        Thread.sleep(800);

        Select city = new Select(driver.findElement(By.id("city")));
        city.selectByIndex(1);

        driver.findElement(By.id("phone")).sendKeys("+919876543210");

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("document.getElementById('dob').value='2001-05-10'");

        js.executeScript(
        	    "document.querySelector(\"input[name='gender'][value='male']\").checked = true;" +
        	    "document.querySelector(\"input[name='gender'][value='male']\").dispatchEvent(new Event('change'));"
        	);
        driver.findElement(By.id("address")).sendKeys("Noida Sector 62");
        driver.findElement(By.id("zip")).sendKeys("226023");

        driver.findElement(By.id("password")).sendKeys("Password1");
        driver.findElement(By.id("confirm_password")).sendKeys("Password1");

        driver.findElement(By.cssSelector(".terms input")).click();

        // 4. Trigger validation (important!)
        driver.findElement(By.id("email")).click();
        Thread.sleep(500);

        // 5. Validate error message
        WebElement nameError = driver.findElement(By.id("nameError"));
        String errorText = nameError.getText();
        System.out.println("Error message: " + errorText);

        Assert.assertFalse(errorText.isEmpty(), "Expected error for missing last name");

        // 6. Capture screenshot
        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(src, new File("error-state.png"));
        System.out.println("Screenshot saved: error-state.png");
    }
    @Test
    public void submitWithAllValidData_shouldSucceed() throws Exception {

        driver.get("file:///D:/work%20stuff/registration-form/index.html");

        // 1. Fill Personal Data
        driver.findElement(By.id("firstname")).sendKeys("Shivansh");
        driver.findElement(By.id("lastname")).sendKeys("Dixit");
        driver.findElement(By.id("email")).sendKeys("shivansh@gmail.com");

        // 2. Country → State → City
        Select country = new Select(driver.findElement(By.id("country")));
        country.selectByValue("in");
        Thread.sleep(800);

        Select state = new Select(driver.findElement(By.id("state")));
        state.selectByValue("dl");
        Thread.sleep(800);

        Select city = new Select(driver.findElement(By.id("city")));
        city.selectByIndex(1);

        // 3. Phone (with country code)
        driver.findElement(By.id("phone")).sendKeys("+919876543210");

        // 4. DOB (via JS)
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("document.getElementById('dob').value='2001-05-10';");

        // 5. Gender
        js.executeScript(
            "document.querySelector(\"input[name='gender'][value='male']\").checked = true;" +
            "document.querySelector(\"input[name='gender'][value='male']\").dispatchEvent(new Event('change'));"
        );

        // 6. Address & Zip
        driver.findElement(By.id("address")).sendKeys("Noida Sector 62");
        driver.findElement(By.id("zip")).sendKeys("226023");

        // 7. Passwords (matching)
        driver.findElement(By.id("password")).sendKeys("Password1");
        driver.findElement(By.id("confirm_password")).sendKeys("Password1");

        // 8. Accept Terms
        driver.findElement(By.cssSelector(".terms input")).click();

        // 9. Submit
        driver.findElement(By.cssSelector(".submit-btn")).click();

        // ⏳ Wait for success UI
        Thread.sleep(1500);

        // 10. Validate success (button text)
        WebElement submitBtn = driver.findElement(By.cssSelector(".submit-btn"));
        String btnText = submitBtn.getText();
        System.out.println("Submit button text: " + btnText);

        Assert.assertTrue(btnText.toLowerCase().contains("success"), "Form submission failed");


        // 11. Capture Screenshot
        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(src, new File("success-state.png"));
        System.out.println("Screenshot saved: success-state.png");
    }
    @Test
    public void countryChange_shouldUpdateStates() throws InterruptedException {

        driver.get("file:///D:/work%20stuff/registration-form/index.html");

        Select country = new Select(driver.findElement(By.id("country")));
        Select state = new Select(driver.findElement(By.id("state")));

        // Select India
        country.selectByValue("in");
        Thread.sleep(1000);

        String firstStateIndia = state.getOptions().get(1).getText();
        System.out.println("First state for India: " + firstStateIndia);

        // Change country to USA
        country.selectByValue("us");
        Thread.sleep(1000);

        String firstStateUSA = state.getOptions().get(1).getText();
        System.out.println("First state for USA: " + firstStateUSA);

        // Validation
        Assert.assertNotEquals(
            firstStateIndia,
            firstStateUSA,
            "❌ State list did not update after country change"
        );

        System.out.println("✅ Country → State dropdown logic working");
    }
    @Test
    public void stateChange_shouldUpdateCities() throws InterruptedException {

        driver.get("file:///D:/work%20stuff/registration-form/index.html");

        // Step 1: Select Country = India
        Select country = new Select(driver.findElement(By.id("country")));
        country.selectByValue("in");
        Thread.sleep(1000);

        // Step 2: Select State = Delhi
        Select state = new Select(driver.findElement(By.id("state")));
        state.selectByValue("dl");
        Thread.sleep(1000);

        // Step 3: Capture first city for Delhi
        Select city = new Select(driver.findElement(By.id("city")));
        String cityForDelhi = city.getOptions().get(1).getText();
        System.out.println("First city for Delhi: " + cityForDelhi);

        // Step 4: Change State = Maharashtra
        state.selectByValue("mh");
        Thread.sleep(1000);

        // Step 5: Capture first city for Maharashtra
        city = new Select(driver.findElement(By.id("city")));
        String cityForMH = city.getOptions().get(1).getText();
        System.out.println("First city for Maharashtra: " + cityForMH);

        // Step 6: Assertion
        Assert.assertNotEquals(
            cityForDelhi,
            cityForMH,
            "❌ City dropdown did NOT update after state change"
        );

        System.out.println("✅ State → City dropdown logic working");
    }
    @Test
    public void passwordStrength_shouldUpdateCorrectly() throws InterruptedException {

        driver.get("file:///D:/work%20stuff/registration-form/index.html");

        // ---------- WEAK ----------
        driver.findElement(By.id("password")).sendKeys("abc");
        Thread.sleep(1000);

        String weakText = driver.findElement(By.id("strengthText")).getText();
        System.out.println("Password strength (weak): " + weakText);
        Assert.assertEquals(weakText, "Weak");

        driver.findElement(By.id("password")).clear();
        Thread.sleep(500);

        // ---------- MEDIUM ----------
        // Medium = length + uppercase ONLY (no number, no special char)
        driver.findElement(By.id("password")).sendKeys("Password");
        Thread.sleep(1000);

        String mediumText = driver.findElement(By.id("strengthText")).getText();
        System.out.println("Password strength (medium): " + mediumText);
        Assert.assertEquals(mediumText, "Medium");

        driver.findElement(By.id("password")).clear();
        Thread.sleep(500);

        // ---------- STRONG ----------
        driver.findElement(By.id("password")).sendKeys("Password@123");
        Thread.sleep(1000);

        String strongText = driver.findElement(By.id("strengthText")).getText();
        System.out.println("Password strength (strong): " + strongText);
        Assert.assertEquals(strongText, "Strong");

        System.out.println("✅ Password strength Weak / Medium / Strong validated");
    }
    @Test
    public void wrongConfirmPassword_shouldShowError() throws InterruptedException {

        driver.get("file:///D:/work%20stuff/registration-form/index.html");

        // First Name
        driver.findElement(By.id("firstname")).sendKeys("Shivansh");

        // Last Name
        driver.findElement(By.id("lastname")).sendKeys("Dixit");

        // Email
        driver.findElement(By.id("email")).sendKeys("shivansh@gmail.com");

        // Country
        Select country = new Select(driver.findElement(By.id("country")));
        country.selectByValue("in");
        Thread.sleep(1000);

        // State
        Select state = new Select(driver.findElement(By.id("state")));
        state.selectByValue("dl");
        Thread.sleep(1000);

        // City
        Select city = new Select(driver.findElement(By.id("city")));
        city.selectByIndex(1);

        // Phone
        driver.findElement(By.id("phone")).sendKeys("9876543210");

        // DOB (via JS)
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("document.getElementById('dob').value='2001-05-10';");

        // Gender
        
        js.executeScript(
            "const g=document.querySelector(\"input[name='gender'][value='male']\");" +
            "g.checked=true;" +
            "g.dispatchEvent(new Event('change'));"
        );


        // Address
        driver.findElement(By.id("address")).sendKeys("Noida Sector 62");

        // Zip
        driver.findElement(By.id("zip")).sendKeys("226023");

        // ❌ Password mismatch
        driver.findElement(By.id("password")).sendKeys("Password@123");
        driver.findElement(By.id("confirm_password")).sendKeys("Password@12");

        // Accept terms
        driver.findElement(By.cssSelector(".terms input")).click();

        Thread.sleep(1000);

        // 🔍 Validate error message
        String errorText = driver.findElement(By.id("confirm_passwordError")).getText();
        System.out.println("Confirm password error: " + errorText);

        Assert.assertTrue(
            errorText.contains("Passwords do not match"),
            "Expected password mismatch error not shown"
        );

        // 🔒 Submit button should be disabled
        boolean isDisabled = driver.findElement(By.cssSelector(".submit-btn")).isEnabled();
        Assert.assertFalse(isDisabled, "Submit button should be disabled on password mismatch");

        System.out.println("✅ Wrong confirm password validation working");
    }
    
    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}
