import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"



function Comments() {
    return(
        <Card>
            <CardHeader>
                Username
            </CardHeader>
            <CardContent>TEST</CardContent>
            <CardFooter>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Likes:</span>
                    <span>•</span>
                    <time>time</time>
                </div>
            </CardFooter>
        </Card>
        
    )
}

export default Comments