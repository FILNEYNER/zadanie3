import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    Box,
    Button,
    Container,
    createTheme,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";

const Login = () => {
    const [login, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const usenavigate = useNavigate();
    const loginApi = () => {
        if (validate()) {
            let inputobj = {
                "login": login,
                "password": password
            };
            fetch("http://91.193.183.139:7000/auth/login", {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('login', login);
                    sessionStorage.setItem('token', resp.token);
                    usenavigate('/')
                }
            });
        }
    }

    const validate = () => {
        let result = true;
        if (login === '' || login === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    const theme = createTheme();
    const navigate = useNavigate();
    const linktyregistrtion = () => {
      navigate('/Register')
        console.log('sd')
    }
      
    
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <Box sx={{mt: 10}}>
                    <Box component="form" onSubmit={loginApi} noValidate sx={{mt: 1}}>
                        <Typography variant="h4">Вход</Typography>
                        <Box component="form" noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                id="login"
                                label="Логин"
                                name="login"
                                required
                                fullWidth
                                autoComplete="login"
                                value={login}
                                onChange={e => usernameupdate(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                id="password"
                                label="Пароль"
                                name="password"
                                type="password"
                                required
                                fullWidth
                                autoComplete="current-password"
                                value={password}
                                onChange={e => passwordupdate(e.target.value)}
                            />

                            <Button type={"button"} onClick={loginApi}
                                    fullWidth variant="contained"
                                    color="secondary" sx={{mt: 2, mb: 2}}>Войти</Button>
                            <p onClick={linktyregistrtion}>Регистрация</p>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
