const cart = JSON.parse(localStorage.getItem('products')) || []

export const actionTypes = {
    CHANGE: 'CART_CHANGE'
}

/* SAVE CART */

export const setCart = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const saveCart = (data) => dispatch => {
    localStorage.setItem('products', JSON.stringify(data))
    dispatch(setCart({itens: data}))
    dispatch(countCart())
    dispatch(totalCart())
}

/* LOAD CART */

export const loadCart = () => dispatch => {
    dispatch(setCart({itens: cart}))
    dispatch(countCart())
    dispatch(totalCart())
}

/* TOTAL CART */

export const totalCart = () => dispatch => {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].qtd;
    }
    dispatch(setCart({total: totalCart}))
}

/* COUNT CART */

export const setCount = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})


export const countCart = () => dispatch => {
    var totalCount = 0;
    for(var item in cart) {
        totalCount += cart[item].qtd;
    }
    dispatch(setCount({count: totalCount}))
}

/* ADD CART */

export const addCart = (product) => dispatch => {
    for(var item in cart) {
        if(cart[item].id === product.id) {
          cart[item].qtd ++;
          dispatch(saveCart(cart))
          return;
        }
    }
    product.qtd = 1;
    cart.push(product);
    dispatch(saveCart(cart))
}

/* REMOVE ITEM CART */

export const removeItem = (product) => dispatch => {
    for(var item in cart) {
        if(cart[item].id === product.id) {
          cart[item].qtd --;
          if(cart[item].qtd === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    dispatch(saveCart(cart))
}

/* REMOVE ALL ITEM CART */

export const removeItemAll = (product) => dispatch => {
    for(var item in cart) {
        if(cart[item].id === product.id) {
          cart.splice(item, 1);
          break;
        }
    }
    dispatch(saveCart(cart))
}