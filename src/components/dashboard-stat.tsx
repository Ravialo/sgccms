import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type DashboardStatProps = {
  title: string;
  value: number;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
};

function DashboardStat({ title, value, icon, description, className, style }: DashboardStatProps) {
  const Icon = icon;
  return (
    <Card className={className} style={style}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="flex items-center justify-between">
          <span className="text-4xl">{value}</span>
          {Icon && <Icon className="h-10 w-10" />}
        </CardTitle>
      </CardHeader>
      <CardContent>{description && <div className="text-xs text-muted-foreground">{description}</div>}</CardContent>
    </Card>
  );
}
export default DashboardStat;
