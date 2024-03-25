s(void*x,void*y){float f=*((int*)x),s=*((int*)y);return(f*f-s*(s-0.1))*99;}
main(n){scanf("%d",&n);int x[n],i;for(i=0;i<n;i++){scanf("%d",&x[i]);}qsort(x,n,4,s);printf("%d",n<1?0:x[0]);}