import {useState} from "react";
import { useRouter } from 'next/router'
import useRequest from "../../hooks/use-request";

const SigninForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault()

        doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} id='email' type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} id='password' type="text" className="form-control"/>
            </div>
            { errors }
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}

export default SigninForm
