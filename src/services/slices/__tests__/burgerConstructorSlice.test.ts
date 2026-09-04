import { describe, test, expect } from '@jest/globals';
import constructorSliceReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  burgerConstructorSelectors,
  initialState
} from '../burgerConstructorSlice';
import { TIngredient } from '@utils-types';

// МОКОВЫЕ БУЛКИ
const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const anotherBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

//МОКОВАЯ НАЧИНКА
const mockMain: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

// МОКОВЫЙ СОУС
const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
};

describe('Тесты burgerConstructorSlice', () => {
  test('Возвращает initialState при неизвестном экшене', () => {
    const newState = constructorSliceReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(initialState);
  });

  describe('addIngredient', () => {
    test('Добавить булку в конструктор', () => {
      const action = addIngredient(mockBun);
      const newState = constructorSliceReducer(initialState, action);

      expect(newState.constructorItems.bun).not.toBeNull();
      expect(newState.constructorItems.bun?.name).toBe(mockBun.name);
      expect(newState.constructorItems.bun?.type).toBe('bun');
      expect(newState.constructorItems.bun?.id).toBeDefined();
    });

    test('Заменить булку в конструкторе', () => {
      const actionAdd = addIngredient(mockBun);
      const state = constructorSliceReducer(initialState, actionAdd);

      const actionReplace = addIngredient(anotherBun);
      const newState = constructorSliceReducer(state, actionReplace);

      expect(newState.constructorItems.bun?.name).toBe(anotherBun.name);
      expect(newState.constructorItems.bun?._id).toBe(anotherBun._id);
    });

    test('Добавить начинку в конструктор', () => {
      const action = addIngredient(mockMain);
      const newState = constructorSliceReducer(initialState, action);

      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0].name).toBe(mockMain.name);
      expect(newState.constructorItems.ingredients[0].id).toBeDefined();
    });

    test('Добавить несколько начинок', () => {
      // Добавляем мейн
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      // Добавляем соус
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      // обе начинки должны добавиться
      expect(state.constructorItems.ingredients).toHaveLength(2);
      expect(state.constructorItems.ingredients[0].name).toBe(mockMain.name);
      expect(state.constructorItems.ingredients[1].name).toBe(mockSauce.name);
    });
  });

  describe('removeIngredient', () => {
    test('Удалять начинку по id', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      const ingredientId = state.constructorItems.ingredients[0].id;

      const action = removeIngredient(ingredientId);
      const newState = constructorSliceReducer(state, action);

      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0].name).toBe(
        mockSauce.name
      );
    });

    test('Не должен удалять другие ингредиенты с тем же _id', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = constructorSliceReducer(state, addIngredient(mockMain));

      const firstId = state.constructorItems.ingredients[0].id;
      const action = removeIngredient(firstId);
      const newState = constructorSliceReducer(state, action);

      expect(newState.constructorItems.ingredients).toHaveLength(1);
    });

    test('Не должен менять состояние при удалении несуществующего id', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );

      const action = removeIngredient('non-existent-id');
      const newState = constructorSliceReducer(state, action);

      expect(newState).toEqual(state);
    });
  });

  describe('moveIngredient', () => {
    test('Перемещение ингредиента вниз', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      const firstId = state.constructorItems.ingredients[0].id;
      const secondId = state.constructorItems.ingredients[1].id;

      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const newState = constructorSliceReducer(state, action);

      expect(newState.constructorItems.ingredients[0].id).toBe(secondId);
      expect(newState.constructorItems.ingredients[1].id).toBe(firstId);
    });

    test('Перемещение ингредиента вверх', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      const firstId = state.constructorItems.ingredients[0].id;
      const secondId = state.constructorItems.ingredients[1].id;

      const action = moveIngredient({ fromIndex: 1, toIndex: 0 });
      const newState = constructorSliceReducer(state, action);

      expect(newState.constructorItems.ingredients[0].id).toBe(secondId);
      expect(newState.constructorItems.ingredients[1].id).toBe(firstId);
    });

    test('Не должен менять состояние при перемещении на ту же позицию', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      const action = moveIngredient({ fromIndex: 0, toIndex: 0 });
      const newState = constructorSliceReducer(state, action);

      expect(newState).toEqual(state);
    });

    test('Перемещение ингредиента на отрицательный индекс', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      const firstId = state.constructorItems.ingredients[0].id;
      const secondId = state.constructorItems.ingredients[1].id;

      const action = moveIngredient({ fromIndex: 0, toIndex: -1 });
      const newState = constructorSliceReducer(state, action);

      expect(newState).toEqual(state);
    });

    test('Перемещение ингредиента на индекс больше длины', () => {
      let state = constructorSliceReducer(
        initialState,
        addIngredient(mockMain)
      );
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      const firstId = state.constructorItems.ingredients[0].id;
      const secondId = state.constructorItems.ingredients[1].id;

      const action = moveIngredient({ fromIndex: 1, toIndex: 2 });
      const newState = constructorSliceReducer(state, action);

      expect(newState).toEqual(state);
    });
  });

  describe('clearConstructor', () => {
    test('Очистка конструктора', () => {
      let state = constructorSliceReducer(initialState, addIngredient(mockBun));
      state = constructorSliceReducer(state, addIngredient(mockMain));
      state = constructorSliceReducer(state, addIngredient(mockSauce));

      expect(state.constructorItems.bun).not.toBeNull();
      expect(state.constructorItems.ingredients).toHaveLength(2);

      const action = clearConstructor();
      const newState = constructorSliceReducer(state, action);

      expect(newState.constructorItems.bun).toBeNull();
      expect(newState.constructorItems.ingredients).toHaveLength(0);
    });
  });
});
