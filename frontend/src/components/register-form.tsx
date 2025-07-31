import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">创建账户</h1>
        <p className="text-muted-foreground text-sm">
          输入您的信息以创建新账户
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input
            id="name"
            type="text"
            placeholder="张三"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">确认密码</Label>
          <Input
            id="confirm-password"
            type="password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          注册
        </Button>
        <div className="text-center text-sm">
          已有账户？{" "}
          <a href="/login" className="text-blue-600 underline underline-offset-4">
            登录
          </a>
        </div>
      </form>
    </div>
  )
}