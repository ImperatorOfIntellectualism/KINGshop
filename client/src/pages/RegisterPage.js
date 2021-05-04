import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const RegisterPage = () => {
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({login: '', email: '', password: ''})
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value}) //event.target.name - название инпута в котором происходит событие, event.targe.value - его значение
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
      window.location.replace('/login');
    } catch (error) {
      
    }
  }
    return (
            <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Регистрация</span>
                  <div className="row">
                  <div className="col s12">
                    <div className="input-field inline">
                        <input type="text" className="validate" name="login" onChange={changeHandler} autoComplete="off"/>
                        <label htmlFor="email_inline">Логин</label>
                    </div>
                    <br/>
                    <div className="input-field inline">
                        <input type="email" className="validate" name="email" onChange={changeHandler} autoComplete="off"/>
                        <label htmlFor="email_inline">Email</label>
                    </div>
                    <br/>
                    <div className="input-field inline">
                        <input type="password" className="validate" name="password" onChange={changeHandler} autoComplete="off"/>
                        <label htmlFor="email_inline">Пароль</label>
                    </div>
                  </div>
                </div>
                </div>
                <div className="card-action">
                  <button className="waves-effect waves-light btn-small" onClick={registerHandler} disabled={loading}>Зарегистрироваться</button>
                </div>
              </div>
            </div>
          </div>
    )
}