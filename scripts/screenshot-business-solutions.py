from playwright.sync_api import sync_playwright

errors = []
console_messages = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()

    page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda err: errors.append(f"PAGEERROR: {err}"))

    page.goto("http://localhost:5174/business-solutions")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1200)

    page.screenshot(path="scripts/_screenshots/business-solutions-hero.png", full_page=False)
    page.screenshot(path="scripts/_screenshots/business-solutions-full.png", full_page=True)

    print("=== CONSOLE MESSAGES ===")
    for m in console_messages:
        print(m)
    print("=== PAGE ERRORS ===")
    for e in errors:
        print(e)
    print("=== H1 ===")
    print(page.locator("h1").first.text_content())
    print("=== JSON-LD count ===")
    print(page.locator('script[type="application/ld+json"]').count())
    print("=== <title> ===")
    print(page.title())

    browser.close()
