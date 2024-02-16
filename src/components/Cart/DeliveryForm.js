import styles from './DeliveryForm.module.css';
import useValidInput from '../../hooks/useValidInput';
import { useState } from 'react';

const DeliveryForm = ({closeForm, cartItems}) => {
  const [sendingOrder, setSendingOrder] = useState(false);
  const [sendingError, setSendingError] = useState('');
  const [orderSend, setOrderSend] = useState(false);

  const {value: fullNameValue,
        itHasError: fullNameHasError,
        wasTouch: fullNameWasTouch,
        inputOnChange: fullNameOnChangeHandler,
        inputOnBlur: fullNameOnBlurHandler} = useValidInput();

  const {value: addressValue,
        itHasError: addressHasError,
        inputOnChange: addressOnChangeHandler,
        inputOnBlur: addressOnBlurHandler} = useValidInput();

  const {value: telValue,
        itHasError: telHasError,
        inputOnChange: telOnChangeHandler,
        inputOnBlur: telOnBlurHandler} = useValidInput();

  const sendOrder = async(e) => {
    e.preventDefault();
    if (fullNameHasError || addressHasError || telHasError){
      return;
    }
    setSendingOrder(true);

    try{
      const sendOrder = await fetch('https://apps-93cf2-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: fullNameValue,
          orderedMeals: cartItems.items,
          address: addressValue,
          tel: telValue,
        })
      })
  
      if(!sendOrder.ok){
        throw new Error ('Что-то пошло не так')         
      }
      setSendingOrder(false)
      setOrderSend(true);

    } catch (e){
      setSendingOrder(false);
      setSendingError(e.message);
    }


  }

  if (sendingOrder === true){
    return <p className={styles.loading}>Загрузка...</p>
  }

  if(sendingError !== ''){
    return <p className={styles.loading}>{sendingError}</p>
  }

  if(orderSend){
    return <p className={styles.loading}>Заказ выполнен</p>
  }
  
    return <form className={styles.form}  onSubmit={sendOrder}>
        <div className={fullNameHasError ? `${styles.control} ${styles.invalid}` : styles.control}> 
            <label htmlFor="full-name">Имя</label>
            <input type="text" 
            id="full-name" 
            placeholder="Введите имя"
            value={fullNameValue} 
            onChange={fullNameOnChangeHandler}
            onBlur={fullNameOnBlurHandler}/>
            {fullNameHasError ? <p className={styles.invalid}>Поле должно быть заполнено</p> : '' }
        </div>
        <div className={addressHasError? `${styles.control} ${styles.invalid}` : styles.control}> 
          <label htmlFor="address">Адрес</label>
            <input type="text" 
            id="address" 
            placeholder="Улица, дом, подъезд, квартира"
            value={addressValue}
            onChange={addressOnChangeHandler}
            onBlur={addressOnBlurHandler}  />
            {addressHasError ? <p className={styles.invalid}>Поле должно быть заполнено</p> : '' }
        </div>
        <div className={telHasError ? `${styles.control} ${styles.invalid}` : styles.control}> 
        <label htmlFor="phone">Номер телефона</label>
            <input type="tel" 
            id="phone" 
            placeholder="Введите номер телефона"
            value={telValue}
            onChange={telOnChangeHandler}
            onBlur={telOnBlurHandler}            
              />
              {telHasError ? <p className={styles.invalid}>Поле должно быть заполнено</p> : '' }
        </div>
        <div className={styles.actions}>
          <button className={styles.submit} disabled={!fullNameWasTouch || fullNameHasError || addressHasError || telHasError}>Подтвердить заказ</button>
          <button onClick={closeForm}>Отменить</button>        
          </div>
    </form>
}

export default DeliveryForm;