import { Page } from '@playwright/test';
import { mockOrderResponse, mockTokens, mockUser } from '../data/data';
import { expect } from '@playwright/test';

// -- SETUP --
// HAR для ингредиентов
export const setupIngredients = async (page: Page) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/api/ingredients',
    update: false
  });
};

// установка данных авторизации
export const setAuthTokens = async (page: Page) => {
  await page.context().addCookies([
    {
      name: 'accessToken',
      value: mockTokens.accessToken,
      domain: 'localhost',
      path: '/'
    }
  ]);

  await page.addInitScript((tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    document.cookie = `accessToken=${tokens.accessToken}; path=/`;
  }, mockTokens);
};

export const setupMocks = async (page: Page) => {
  // Мок для пользователя
  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: mockUser
      })
    });
  });

  // Мок для заказа
  await page.route('**/api/orders', async (route) => {
    const request = route.request();
    if (request.method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockOrderResponse)
      });
    } else {
      await route.continue();
    }
  });
};

// ждем отображения списка ингредиентов
export const waitForIngredientsList = async (page: Page) => {
  await page.waitForSelector('[data-testid="burger-ingredients"]');
};

// -- МОДАЛКИ --
// Открыть модалку ингредиента
export const openIngredientModal = async (
  page: Page,
  type: 'bun' | 'main' | 'sauce' = 'bun'
) => {
  const ingredient = page.locator(`[data-testid="ingredient-${type}"]`).first();
  await ingredient.click();
};

// скрыть модалку по кресту
export const closeModalByCross = async (page: Page) => {
  const closeButton = page.locator('[data-testid="modal-close"]');
  await closeButton.click();
};

// скрыть модалку по клику вне
export const closeModalByOverlay = async (page: Page) => {
  const overlay = page.locator('[data-testid="modal-overlay"]');
  await overlay.click({ position: { x: 10, y: 10 } });
};

// -- ВЗАИМОДЕЙСТВИЕ С КОНСТРУКТОРОМ --
// добавить булку
export const addBun = async (page: Page) => {
  const bun = page.locator('[data-testid="ingredient-bun"]').first();
  await bun.locator('[data-testid="add-button"]').click();
};

// добавить начинку
export const addMain = async (page: Page) => {
  const main = page.locator('[data-testid="ingredient-main"]').first();
  await main.locator('[data-testid="add-button"]').click();
};

// добавить соус
export const addSauce = async (page: Page) => {
  const sauce = page.locator('[data-testid="ingredient-sauce"]').first();
  await sauce.locator('[data-testid="add-button"]').click();
};

// -- ЗАКАЗ --
//сделать заказ
export const makeOrder = async (page: Page) => {
  const orderButton = page.locator('[data-testid="order-button"]');
  await orderButton.click();
};

// проверить, что конструктор пуст
export const expectConstructorEmpty = async (page: Page) => {
  await expect(
    page.locator('[data-testid="constructor-bun-top"]')
  ).not.toBeVisible();
  await expect(
    page.locator('[data-testid="constructor-ingredient"]')
  ).toHaveCount(0);
  await expect(
    page.locator('[data-testid="constructor-bun-bottom"]')
  ).not.toBeVisible();
};
