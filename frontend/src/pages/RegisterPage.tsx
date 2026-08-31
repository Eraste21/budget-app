// import { useState } from "react"

export const RegisterPage = () => {
    /* const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') */
    
    return (
        <>
            <form action="" method="post">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" name="username" id="username" placeholder="ex: Dupont" /* value={username} */ />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="ex: dupont@gmail.com" /* value={email} */ />

                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" placeholder="ex: dup0n1@-2026" /* value={password} */ />

                <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                <input type="confirm-password" name="confirm-password" id="confirm-password" /* value={confirmPassword} */ />
            </form>
        </>
    )
}
