import { inject, Injectable } from '@angular/core'
import { Router, UrlSegmentGroup } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class OutletCloser {
  // reference: https://github.com/angular/angular/pull/40272
  private readonly router = inject(Router)

  closeOutlet(outletName: string): Promise<boolean> {
    const currentUrlTree = this.router.parseUrl(this.router.routerState.snapshot.url)
    const newRootSegment = this.recursivelyClearOutlet(currentUrlTree.root, outletName)
    currentUrlTree.root = newRootSegment
    return this.router.navigateByUrl(currentUrlTree)
  }

  recursivelyClearOutlet(root: UrlSegmentGroup, outletName: string): UrlSegmentGroup {
    const newChildren: { [key: string]: UrlSegmentGroup } = {} // Add index signature
    for (const [childOutlet, child] of Object.entries(root.children)) {
      if (childOutlet !== outletName) {
        const newChild = this.recursivelyClearOutlet(child, outletName)
        newChildren[childOutlet] = newChild
      }
    }
    return new UrlSegmentGroup(root.segments, newChildren)
  }
}
