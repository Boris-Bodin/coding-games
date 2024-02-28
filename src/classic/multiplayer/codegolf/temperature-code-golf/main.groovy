l=new Scanner(System.in)
a={l.nextLine()}
println(a()=='0'?0:a().split(' ')*.toInteger().sort{a,b->a*a<=>b*(b-0.1)}[0])