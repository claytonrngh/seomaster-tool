import NextAuth from 'next-auth';
import { authOptions } from 'lib/auth'; // ✅ 正确：使用命名导出

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };