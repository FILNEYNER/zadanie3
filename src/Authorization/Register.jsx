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

const Register = () => {

    const [login, loginchange] = useState("");
    const [password, passwordchange] = useState("");
    const IsValidate = () => {
        let isproceed = true;

        if (login === null || login === '') {
            isproceed = false;
        }
        if (password === null || password === '') {
            isproceed = false;
        }
        return isproceed;
    }

    const registerApi = () => {
        let regobj = {login, password,};
        if (IsValidate()) {
            fetch("http://91.193.183.139:7000/auth/register", {
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    const theme = createTheme();
    const navigate = useNavigate();
    const linktylogin = () => {
        navigate('/Login')
        console.log('asd')
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <Box sx={{mt: 10}}>
                    <Box component="form" onSubmit={registerApi} noValidate sx={{mt: 1}}>
                        <Typography variant="h4">
                            Регистрация
                        </Typography>
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
                                onChange={e => loginchange(e.target.value)}
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
                                onChange={e => passwordchange(e.target.value)}
                            />
                        </Box>

                        <Button type="submit"
                                fullWidth variant="contained"
                                color="secondary" sx={{mt: 2, mb: 2}}>Зарегистрироваться</Button>
                        <p onClick={linktylogin}>Войдите</p>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Register;
