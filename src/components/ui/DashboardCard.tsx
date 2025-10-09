import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./Card"
type Props = {
    title: string;
    value: string | number;
    Icon: React.ElementType;
    targetRoute: string;
}
function DashboardCard({title, value, Icon,targetRoute}: Props) {
    const navigate = useNavigate();
  return (
    <div className="cursor-pointer" onClick={() => navigate(targetRoute)}>
        <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{title}</p>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                </div>
                {Icon && <Icon className="h-8 w-8 text-primary" />}
              </div>
            </CardContent>
          </Card>  
    </div>
         )
}

export default DashboardCard