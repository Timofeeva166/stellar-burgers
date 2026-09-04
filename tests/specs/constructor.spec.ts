import { test, expect } from '@playwright/test';
import {
  setupIngredients,
  setAuthTokens,
  waitForIngredientsList,
  addBun,
  addMain,
  addSauce,
  openIngredientModal,
  closeModalByCross,
  closeModalByOverlay,
  makeOrder,
  expectConstructorEmpty,
  setupMocks
} from '../helpers/helpers';

test.describe('Тесты конструктора бургеров', () => {
  test.describe('Взаимодействие с модальными окнами', () => {
    test.beforeEach(async ({ page }) => {
      await setupIngredients(page);
      await page.goto('/');
      await waitForIngredientsList(page);
    });

    test('Открытие модального окна при клике по ингредиенту', async ({
      page
    }) => {
      await openIngredientModal(page, 'bun');
      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();
      await expect(modal).toContainText('Детали ингредиента');
    });

    test('Отображение правильных данных ингредиента в модалке', async ({
      page
    }) => {
      await openIngredientModal(page, 'bun');
      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();

      await expect(modal).toContainText('Краторная булка N-200i');
      await expect(modal).toContainText('420');
      await expect(modal).toContainText('80');
      await expect(modal).toContainText('24');
      await expect(modal).toContainText('53');
    });

    test('Закрытие модального окна по крестику', async ({ page }) => {
      await openIngredientModal(page, 'bun');
      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();
      await closeModalByCross(page);
      await expect(modal).not.toBeVisible();
    });

    test('Закрытие модального окна по клику вне', async ({ page }) => {
      await openIngredientModal(page, 'bun');
      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();
      await closeModalByOverlay(page);
      await expect(modal).not.toBeVisible();
    });
  });

  test.describe('Взаимодействие с конструктором', () => {
    test.beforeEach(async ({ page }) => {
      await setupIngredients(page);
      await page.goto('/');
      await waitForIngredientsList(page);
    });

    test('Добавить булку в конструктор', async ({ page }) => {
      await addBun(page);
      const bunTop = page.locator('[data-testid="constructor-bun-top"]');
      await expect(bunTop).toBeVisible();
      const bunBottom = page.locator('[data-testid="constructor-bun-bottom"]');
      await expect(bunBottom).toBeVisible();
    });

    test('Добавить начинку в конструктор', async ({ page }) => {
      await addMain(page);
      const ingredient = page.locator('[data-testid="constructor-ingredient"]');
      await expect(ingredient).toBeVisible();
    });

    test('Добавить соус в конструктор', async ({ page }) => {
      await addSauce(page);
      const ingredient = page.locator('[data-testid="constructor-ingredient"]');
      await expect(ingredient).toBeVisible();
    });

    test('Добавить несколько ингредиентов', async ({ page }) => {
      await addBun(page);
      await addMain(page);
      await addSauce(page);

      await expect(
        page.locator('[data-testid="constructor-bun-top"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="constructor-bun-bottom"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="constructor-ingredient"]')
      ).toHaveCount(2);
    });
  });

  test.describe('Взаимодействие с заказом', () => {
    test.beforeEach(async ({ page }) => {
      await setupMocks(page);
      await setAuthTokens(page);
      await page.goto('/');
      await page.waitForSelector('[data-testid="burger-ingredients"]');
    });

    test('Создание заказа', async ({ page }) => {
      await addBun(page);
      await addMain(page);
      await addSauce(page);

      await makeOrder(page);

      const orderModal = page.locator('[data-testid="order-modal"]');
      await expect(orderModal).toBeVisible();

      const orderNumber = await orderModal.locator('h2').textContent();
      expect(orderNumber).toMatch(/\d+/);
    });

    test('Очистка конструктора', async ({ page }) => {
      await addBun(page);
      await addMain(page);
      await addSauce(page);

      await expect(
        page.locator('[data-testid="constructor-bun-top"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="constructor-bun-bottom"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="constructor-ingredient"]')
      ).toHaveCount(2);

      await makeOrder(page);
      const orderModal = page.locator('[data-testid="order-modal"]');
      await expect(orderModal).toBeVisible();
      await closeModalByCross(page);

      await expect(orderModal).not.toBeVisible();
      await expectConstructorEmpty(page);
    });
  });
});
