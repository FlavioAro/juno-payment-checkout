import React from 'react'
import { FcOpenedFolder } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../../store/actions/auth.action';
import Login from '../auth/login';
import Register from '../auth/register';
import Header from '../header'
import Payment from './pay';

export default function Order() {
    const dispatch = useDispatch()
    const { itens, total, count } = useSelector(state => state.cartReducer)

    const [tab, setTab] = React.useState(0)

    React.useEffect(() => {
        dispatch(verifyToken()).then(res => res === 401 && window.location.reload())
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h3 className="font-weight-normal mb-4">Checkout</h3>

                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="font-weight-normal mt-2">1 - INFORMAÇÕES PESSOAIS</h5>
                            </div>
                            {(!localStorage.getItem('access_token')) &&
                                <div className="p-5">
                                    <div className="d-flex mb-5 pointer">
                                        <h5 onClick={() => setTab(0)} className={(tab === 1) ? 'text-muted' : ''}>Login</h5>
                                        <h5 className="ms-3 me-3">|</h5>
                                        <h5 onClick={() => setTab(1)} className={(tab === 0) ? 'text-muted' : ''}>Cadastrar</h5>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {(tab < 1) ? <Login /> : <Register />}
                                        </div>
                                    </div>
                                </div>
                            }
                            <hr className="m-0" />
                            <div className="card-body">
                                <h5 className="font-weight-normal mt-2">2 - PAGAMENTO</h5>
                                {(localStorage.getItem('access_token')) &&
                                    <>
                                    {(itens.length > 0) ?
                                        <Payment />
                                        :
                                        <div className="text-center mt-5 pt-5 mb-5 pb-5">
                                            <FcOpenedFolder size="70" />
                                            <h6 className="mt-4 text-muted">Seu carrinho esta vazio</h6>
                                        </div>
                                    }
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <label className="label-custom text-muted mb-4">{count} item(s)</label>
                                {itens.map((item, index) => (
                                    <div key={index} className="row mb-4">
                                        <div className="col-3 product-img-small">
                                            <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#868e96"></rect></svg>
                                        </div>
                                        <div className="col-8 product-title">
                                            <label className="label-custom d-block">{item.title}</label>
                                            <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.qtd)}</strong>
                                        </div>
                                        <div className="col-1">
                                            <div><strong>{item.qtd}</strong></div>
                                        </div>
                                    </div>
                                ))}

                                <div class="d-flex justify-content-between alert alert-secondary mt-5" role="alert">
                                    <label className="label-custom m-0">Total</label>
                                    <label className="label-custom m-0">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(total)}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
