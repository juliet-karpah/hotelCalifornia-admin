# My Notes

## Hooks

### usePathname()
This hook is used in client components to retrieve the current URL's pathname. 
```
import { usePathname } from 'next/navigation'

const pathname = usePathname()
```

### useSearchParams
This hook is used to retrieve parameters from a URL in the client component. 
```
import { useSearchParams } from 'next/navigation'

const search = searchParams.get(paramName)
```


## Performance 

- Cumulative Layout Shift to evaluate performance and user experience of website.
- Using the next/font module makes Nextjs to optimize fonts by downloading the font files at build time.
- next/image component is good for optimization by
    - adding responsiveness to different screen sizes
    - removing layout shift as the images load
    - lazy load images (images only load as they enter the viewport)
    - serving images in modern formats like webP and AVIF
- next/link is used to:
    - navigate the page using client side javascript
    - automatically prefetch a page before it is loaded
- Static rendering: data fetching and rendering happens on the server at build time. Benefits:
    - prerendered content can be cached and distributed when deployed.
    - reduces compute cost because the server does not generate content at every request
    - valuable for data shared to users or data that doesnt change often like product page or blogs.
- Dynamite Rendering: The server sents the content whenever the user sents a request. This is appropriate when a page has real-time data, user specific content, and for data that can allow be accessed during request time like cookies and URL search parameters.
    - The app is as fast as the slowest data fetch.
    - In nextjs calling a dynamic function in a route makes the entire route dynamite.
- Streaming
    - Data transfer method that works by breaking a route into smaller chunks and progressively streams data from the server to the client when the data is available.
    - Streaming solves the issue of the webpage being blocked by slow data transfer.
    - It allows the user to view and interact with parts of the page without loading all the data.
    - Streaming can be added by using loading.tsx or suspense in the component.
    - A loading skeleton can be implimented in the loading.tsx file as a placeholder/fallback UI.
    - A good practice is moving data fetches into components and then wrapping the components with suspense.
- Partial Prendering: The technique of combining static, dynamic rendering, and streaming in one route.
    - On page load, the static shell of the route loads.
    - The shell has holes that the dynamic content will fill eg cart, dashboard info
    - The dynamic content will be streamed in parallel.
    - Enable partial prerendering by adding ppr in the next.config.mjs file
    - export const experimental_ppr = true; should be added to a route to implement PPR

## Routing
- Route Groups
    - It is used to organize files without affecting the URL path structure. To separate the application into sections with routing groups, you add parenthesis () to the folder name eg (marketing).


## Error Handling
- The try/catch statement is used to gracefully handle errors in server actions. 
- Error file can be used to create fallback UI when there is any error.
    - The Error file is a client component.
    - It accepts the error and reset props. The error props is an instance of javascript's error object. The reset prop is a function to reset the error boundary. 
- Handing 404 errors with notFound function when the resource does not exist.



## Caching 


## Data Fetching 


## Testing


## Authentication
