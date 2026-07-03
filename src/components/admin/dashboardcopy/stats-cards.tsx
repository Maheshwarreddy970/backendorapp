import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCards({
  stats,
}: {
  stats: { title: string; value: string | number }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}