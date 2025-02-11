## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.


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



## Error Handling 


## Caching 


## Data Fetching 


## Testing


## Authentication
