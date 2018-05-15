import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isResolved'
})
export class IsResolvedPipe implements PipeTransform {
posts: any
  transform(posts)
   {
      posts.forEach((post, i) => {
      posts[i].isResolve = true;
  
  })

}
}