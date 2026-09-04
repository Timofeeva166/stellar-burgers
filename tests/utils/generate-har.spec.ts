import { test, expect } from '@playwright/test';

//ГЕНЕРАЦИЯ HAR-ФАЙЛОВ ДЛЯ МОКИРОВАНИЯ ДАННЫХ

test.describe('Генерация HAR-файлов', () => {
  // Генерация для ингредиентов
  test('мокирование ингредиетов', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: true
    });

    await page.goto('/');
    await page.waitForSelector('[data-testid="burger-ingredients"]');
  });
});
