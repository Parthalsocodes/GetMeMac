import { NextResponse } from "next/server";

export function proxy(request) {
  const userAgent = request.headers.get("user-agent") || "";

  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(userAgent);

  if (isMobile) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Desktop Only</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: #0f172a;
              color: white;
              font-family: Arial, sans-serif;
            }

            .container {
              text-align: center;
              padding: 20px;
            }

            h1 {
              font-size: 42px;
              margin-bottom: 16px;
            }

            p {
              color: #cbd5e1;
              font-size: 18px;
              line-height: 1.6;
            }

            .icon {
              font-size: 70px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">&#128187</div>
            <h1>Desktop Only !</h1>
            <p>
              GetMeMac is currently available only on PC or Laptop.<br/>
              Please open this website on a desktop for the best experience.
            </p>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }

  return NextResponse.next();
}