import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class Solution {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        String MESSAGE = in.nextLine();
        String answer = "";
        byte[] tmp = getAsciiBytes(MESSAGE);
        String BINARYMESSAGE = "";
        for(byte b : tmp)
        {
            String BINARY = Integer.toBinaryString(b);
            int count = 7 - BINARY.length();
            if(count > 0)
            {
                for(int i = 0; i < count;i++)
                    BINARYMESSAGE += "0";
            }
            BINARYMESSAGE += BINARY;
        }
        System.err.println(BINARYMESSAGE);

        char old = '2';
        char actual = '2';
        int count = 0;
        for(int i =0; i < BINARYMESSAGE.length();i++)
        {
            actual = BINARYMESSAGE.charAt(i);
            if(old != actual && old != '2')
            {
                for(int y = 0; y < count ;y++)
                    answer += "0";
                answer += " ";
                count = 0;
            }
            count++;
            if(old != actual)
            {
                if(actual == '0')
                    answer += "00 ";
                if(actual == '1')
                    answer += "0 ";
            }
            old = actual;
        }
        for(int y = 0; y < count ;y++)
            answer += "0";
        System.out.println(answer);
    }

    public static byte[] getAsciiBytes(String input)
    {
        char[] c = input.toCharArray();
        byte[] b = new byte[c.length];
        for (int i = 0; i < c.length; i++)
            b[i] = (byte)(c[i] & 0x007F);

        return b;
    }
}