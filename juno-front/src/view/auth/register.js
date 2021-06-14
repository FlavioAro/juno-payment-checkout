import { Button, TextField } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { change, register } from '../../store/actions/register.action';

export default function Register() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.registerReducer)

    return (
        <>
            <TextField
                label="Nome"
                autoComplete="email"
                margin="normal"
                value={user.name}
                onChange={text => dispatch(change({ name: text.target.value }))}
            />

            <TextField
                label="Email"
                type="email"
                autoComplete="email"
                margin="normal"
                value={user.email}
                onChange={text => dispatch(change({ email: text.target.value }))}
            />

            <TextField
                label="Senha"
                type="password"
                margin="normal"
                value={user.password}
                onChange={text => dispatch(change({ password: text.target.value }))}
            />

            <Button
                variant="contained"
                color="primary"
                size="large"
                className="mt-4 mb-4"
                onClick={() => dispatch(register(user)).then(res => res && window.location.reload())}
            >
            Continuar
            </Button>
        </>
    )
}
