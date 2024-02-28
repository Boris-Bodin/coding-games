Module Player
' Auto-generated code below aims at helping you parse
' the standard input according to the problem statement.

    Sub Main ()
        
        ' game loop
        While True
            Dim max as integer=0
            Dim imax as integer=0
            
            For i as Integer = 0 To 7
                Dim mountainH as Integer
                mountainH = Console.ReadLine() ' represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
                if mountainH > max then
                    max = mountainH
                    imax = i
                end if
            Next

            Console.WriteLine(imax)
        End While
    End Sub
End Module