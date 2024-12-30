# Cloud Resume
This repository hosts Yue's cloud resume project - frontend: HTTP/CSS/JavaScript/DNS/Azure Front Door and CDN. 

Visit my resume website: [Yue He - DevOps Engineer](www.joyceheyue.fun). If it is blank, it means I run out of budget  : (  Sorry.

Below is what I have done to build the fronend. 

## HTML & CSS & JavaScript
I downloaded a static website template on Internet and modified it according to my preference. I modified the header and the footer parts, as well as the rolling pictures and gallery. 

I add a _visits counter_. I wrote this visits counter using `JavaScript`, and store the data in the `database` through an `API` in the backend. 

When the website loads completely, the visits counter will be initiated. It will send a HTTP request to the backend API, and then the API will return a HTTP response with a simple string. The JS code will parse it into an Integer and then update the HTML accordingly.

I could make it a little more complicated if I want to count when IP chages or revisit in a long enough time. For now, let's just count when the website loads completely.

## Azure VM vs Azure Storage for Static Websites
Now I have the website, next I need to deploy it to a web server. Of course I could build a web server with Azure VM or container service. For convenience and simplicity, I decided to use Azure Storage for Static Websites. It is very simple and do not need to create httpd or IIS. It saves me a lot of time and work. However, if I want to dive into the web service, I need to do it. 

My next step would be to crate the web service and deploy it. In fact, I have done it in my previous course projects. But for this project, I used the simplest approach.

## DNS Resolution and Custom Domain
Now I have the URL for my static website. But it is the url for Azure storage static website. I could not expose it to others. I need a `Nginx`; not a real one, but serves the same purpose. I chose to use Azure CDN/Azure FrontDoor. It will make the access faster and secure. 

I purchased a domain name from the third part DNS resolution provider. I authenticated the custom domain name in Azure. And I cannot only use HTTP, but HTTPS for the connection. I follow this guide to configure the HTTPS: [Configure HTTPS on an Azure CDN custom domain](https://learn.microsoft.com/en-us/azure/cdn/cdn-custom-ssl?tabs=option-1-default-enable-https-with-a-cdn-managed-certificate). I used a certificate that is managed by Azure CDN. 

See the reference links for more information on the DNS resolution. 

## Tips
### How to write the JS code?
I haven't written any JS code for over a year, so I picked it up with the help of some guides. 

First I decided the main purpose of the code: fetch the API and update the HTML. I parse the string into Integer and update the visits number in HTML. At last, I dealt with the expections if the API fails or it returns a wrong response. 

###  How to do the version control?
I created three different repositores for this project, one is for frontend, one is for backend(Azure Function), and the other is for IaC (Infrastructure as Code). 

When I want to deploy the whole project, I will push the IaC repository to remote. Here it is GitHub, but it could be others like Azure DevOps Repository. The GitHub Actions workflow will be triggered and then deploy the infrastructure of the project. 

Then I will deploy the Azure Function by pushing it to GitHub and started the workflow. The Function will be deployed as well. This approach allows the function has a flexible code content. 

Finally, I will push the frontend repository, the workflow will automatically copy the web content to Azure storage blob container. And I have configured the Azure FrontDoor so that I could access the website with my own domain name.
### Why did I not use Azure Pipeline but GitHub Actions instead?
They are pretty much the same thing as an automation tool. In Azure official documentation and learning materials, Azure recommends GitHub Actions as an alternative to Azure DevOps. 

And most important to me is that GitHub Actions is FREE! Azure Pipeline requires me to have at least one parallel job to execute the workflow job. I cannot afford it since it costs me quite a lot of budget on other Azure resources. 

### How do I consider the security throughout the deployment?
I mainly considered the security from the following aspects:
1. Network
    - HTTPS Encryption. I used HTTPS to encrypt all communications between the browser and the website. 
    - Used Azure CDN to provide secure and performant content delivery and reduce DDOS attacks. 
2. Identity Security - RBAC
    - OAuth flows to authenticate to Azure using service principal, and avoid hardcoded credentials throughout the development and deployment. 
    - RBAC to enforce the principle of least privilege. 
3. Application level security
    - API security: the backend API is used to isolate the frontend JavaScript and the backend. It protects the database. 
    - CORS configuration: ensure only the authorized frontend domain can interact with the backend API. 
    - All deployment use CI/CD pipelines to avoid manual configuration.

## Useful Links
[Create a Content Delivery Network for your Website with Azure CDN and Blob Services](https://learn.microsoft.com/en-us/training/modules/create-cdn-static-resources-blob-storage/)\
[Map a custom domain to an Azure Blob Storage endpoint](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-custom-domain-name?tabs=azure-portal#endpoint)\
[Configure HTTPS on an Azure CDN custom domain](https://learn.microsoft.com/en-us/azure/cdn/cdn-custom-ssl?tabs=option-1-default-enable-https-with-a-cdn-managed-certificate)\
[JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)\
[Static website hosting in Azure Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)\
[Integrate an Azure Storage account with Azure Content Delivery Network](https://learn.microsoft.com/en-us/azure/cdn/cdn-create-a-storage-account-with-cdn) (This is deprecated, Azure now recommend to use Azure Front Door, but this doc still explain the CDN.)\
[Create an Azure Front Door using Azure portal](https://learn.microsoft.com/en-us/azure/frontdoor/create-front-door-portal?tabs=quick)\
[Use GitHub Actions workflow to deploy your static website in Azure Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-static-site-github-actions?tabs=userlevel)