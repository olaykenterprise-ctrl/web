const fs = require('fs');
let code = fs.readFileSync('app/api/orders/route.ts', 'utf8');
code = code.replace('}).select().single();', '}); // removed select() because of RLS');
fs.writeFileSync('app/api/orders/route.ts', code);
