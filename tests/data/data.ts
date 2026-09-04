// ТОКЕНЫ
export const mockTokens = {
  accessToken:
    'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOTljMTQ4NmExNzJkMDAxYjk5NDEwNCIsImlhdCI6MTc4ODQ4MTk2MSwiZXhwIjoxNzg4NDgzMTYxfQ.q9HCOAdC9_8unSegkf_mPKMRa9qKTqSXHgLwYF-VQl0',
  refreshToken:
    ' e1a558c7ce87261664721c6071e573f56e336057497b2245555f750a58cc898a0b8d9463099c8170'
};

// ИНФОРМАЦИЯ О ЗАКАЗЕ
export const mockOrderResponse = {
  success: true,
  name: 'Био-марсианский краторный бургер',
  order: {
    ingredients: [
      {
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
        'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ],
    _id: '6a9a66e56a172d001b994224',
    owner: {
      name: 'autotest name',
      email: 'ytimatotest@yandex.ru',
      createdAt: '2026-09-03T18:49:44.099Z',
      updatedAt: '2026-09-03T18:49:44.099Z',
    },
    status: 'done',
    name: 'Био-марсианский краторный бургер',
    createdAt: '2026-09-04T06:36:21.323Z',
    updatedAt: '2026-09-04T06:36:21.416Z',
    number: 109783,
    price: 2934
  }
};

// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
export const mockUser = {
  email: 'ytimatotest@yandex.ru',
  name: 'Test User'
};
