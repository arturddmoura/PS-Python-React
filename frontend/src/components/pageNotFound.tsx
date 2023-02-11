import { Box, Typography } from '@mui/material/';

export default function NotFound({ text }: { text: string }) {
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <img style={{ height: '40%', width: '40%' }} src={'/src/assets/error.png'} />
            </Box>
            <Typography textAlign={'center'}>{text}</Typography>

            <Typography textAlign={'center'}>
                <a href="http://www.freepik.com">Designed by pikisuperstar / Freepik</a>
            </Typography>
        </>
    );
}
