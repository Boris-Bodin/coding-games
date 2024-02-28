import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class PositionTest {

    @Test()
    void testConstructor() {
        Position p = new Position(1, 2);
        assertEquals(1, p.x);
        assertEquals(2, p.y);
    }

    @Test()
    void testEquals() {
        Position p1 = new Position(1, 2);
        Position p2 = new Position(1, 2);
        assertEquals(p1, p2);
    }

    @Test()
    void testNotEquals() {
        Position p1 = new Position(1, 2);
        Position p2 = new Position(2, 2);
        assertNotEquals(p1, p2);
    }

    @Test()
    void testToString() {
        Position p = new Position(1, 2);
        assertEquals("(1,2)", p.toString());
    }

    @Test()
    void testDistance() {
        Position p1 = new Position(1, 2);
        Position p2 = new Position(2, 2);
        assertEquals(1, p1.distance(p2));
    }

    @Test()
    void testDistance2() {
        Position p1 = new Position(1, 2);
        Position p2 = new Position(2, 3);
        assertEquals(Math.sqrt(2), p1.distance(p2));
    }

    @Test()
    void testDistance3() {
        Position p1 = new Position(3, 2);
        Position p2 = new Position(2, 1);
        assertEquals(Math.sqrt(2), p1.distance(p2));
    }

    @Test()
    void testDistance4() {
        Position p1 = new Position(1, 2);
        assertEquals(1, p1.distance(2, 2));
    }

    @Test()
    void testDistance5() {
        Position p1 = new Position(1, 2);
        assertEquals(Math.sqrt(2), p1.distance(2, 3));
    }

    @Test()
    void testDistance6() {
        Position p1 = new Position(3, 2);
        assertEquals(Math.sqrt(2), p1.distance(2, 1));
    }

    @Test()
    void testMove() {
        Position p1 = new Position(1, 2);
        p1.move(2, 3);
        assertEquals(p1, new Position(3, 5));
    }

    @Test()
    void testMove2() {
        Position p1 = new Position(1, 2);
        Position p2 = new Position(2, 3);
        p1.move(p2);
        assertEquals(p1, new Position(3, 5));
        assertEquals(p2, new Position(2, 3));
    }

    @Test()
    void testGetCopy() {
        Position p1 = new Position(1, 2);
        Position p2 = new Position(2, 3);
        Position pCopy = p1.getCopy();
        p1.move(p2);
        assertEquals(p1, new Position(3, 5));
        assertEquals(pCopy, new Position(1, 2));
    }

    @Test()
    void testGetCopy2() {
        Position p1 = new Position(1, 2);
        Position p2 = new Position(2, 3);
        Position pCopy = p1.getCopy();
        pCopy.move(p2);
        assertEquals(p1, new Position(1, 2));
        assertEquals(pCopy, new Position(3, 5));
    }

    @Test()
    void testMoveTo() {
        Position p1 = new Position(10, 10);
        Position p2 = new Position(30, 10);
        p1.moveTo(p2, 10);
        assertEquals(p1, new Position(20, 10));
        assertEquals(p2, new Position(30, 10));
    }

    @Test()
    void testMoveTo2() {
        Position p1 = new Position(10, 10);
        Position p2 = new Position(10, 30);
        p1.moveTo(p2, 10);
        assertEquals(p1, new Position(10, 20));
        assertEquals(p2, new Position(10, 30));
    }

    @Test()
    void testMoveTo3() {
        Position p1 = new Position(10, 10);
        Position p2 = new Position(20, 50);
        p1.moveTo(p2, 10);
        assertEquals(p1, new Position(12, 19));
        assertEquals(p2, new Position(20, 50));
    }

}