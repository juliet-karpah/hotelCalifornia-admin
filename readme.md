# My Notes

## Hooks
### usePathname()
This hook is used in client components to retrieve the current URL's pathname. 
```
import { usePathname } from 'next/navigation'

const pathname = usePathname()
```


## Performance 

- Cumulative Layout Shift to evaluate performance and user experience of website.
- Using the next/font module makes Nextjs to optimize fonts by downloading the font files at build time.
- next/image component is good for optimization by
    - adding responsiveness to different screen sizes
    - removing layout shift as the images load
    - lazy load images (images only load as they enter the viewport)
    - serving images in modern formats like webP and AVIF
next/link is used to:
    - navigate the page using client side javascript
    - automatically prefetch a page before it is loaded
Static rendering: data fetching and rendering happens on the server at build time. Benefits:
    - prerendered content can be cached and distributed when deployed.
    - reduces compute cost because the server does not generate content at every request
    - valuable for data shared to users or data that doesnt change often like product page or blogs.
Dynamite Rendering: The server sents the content whenever the user sents a request. This is appropriate when a page has real-time data, user specific content, and for data that can allow be accessed during request time like cookies and URL search parameters.
    - The app is as fast as the slowest data fetch.
Streaming
    - Data transfer method that works by breaking a route into smaller chunks and progressively streams data from the server to the client when the data is available.
    - Streaming solves the issue of the webpage being blocked by slow data transfer.
    - It allows the user to view and interact with parts of the page without loading all the data.
    - Streaming can be added by using loading.tsx or suspense in the component.
    - A loading skeleton can be implimented in the loading.tsx file as a placeholder/fallback UI.


## Error Handling 


## Caching 


## Data Fetching 


## Testing


## Authentication
