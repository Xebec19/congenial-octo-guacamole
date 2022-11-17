import app from './index';
import { PORT } from './utils/environment'

app.listen(PORT,() => console.log(`Server running at ${PORT}`));