import { app } from "./setup";

app.listen(process.env.PORT || 3333, () => {
  console.log("Running");
});