#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cfloat>
#include <cmath>
#include <climits>

using namespace std;
template <class T>
class vec2 {
public:
	T x, y;

	vec2() :x(0), y(0) {}
	vec2(T x, T y) : x(x), y(y) {}
	vec2(const vec2& v) : x(v.x), y(v.y) {}

	vec2& operator=(const vec2& v) {
		x = v.x;
		y = v.y;
		return *this;
	}

	vec2 operator+(vec2& v) {
		return vec2(x + v.x, y + v.y);
	}
	vec2 operator-(vec2& v) {
		return vec2(x - v.x, y - v.y);
	}

	vec2& operator+=(vec2& v) {
		x += v.x;
		y += v.y;
		return *this;
	}
	vec2& operator-=(vec2& v) {
		x -= v.x;
		y -= v.y;
		return *this;
	}

	vec2 operator+(double s) {
		return vec2(x + s, y + s);
	}
	vec2 operator-(double s) {
		return vec2(x - s, y - s);
	}
	vec2 operator*(double s) {
		return vec2(x * s, y * s);
	}
	vec2 operator/(double s) {
		return vec2(x / s, y / s);
	}


	vec2& operator+=(double s) {
		x += s;
		y += s;
		return *this;
	}
	vec2& operator-=(double s) {
		x -= s;
		y -= s;
		return *this;
	}
	vec2& operator*=(double s) {
		x *= s;
		y *= s;
		return *this;
	}
	vec2& operator/=(double s) {
		x /= s;
		y /= s;
		return *this;
	}

	vec2& normalize() {
		if (length() == 0) return *this;
		*this *= (1.0 / length());
		return *this;
	}

	float dist(vec2 v) const {
		vec2 d(v.x - x, v.y - y);
		return d.length();
	}

	float length() const {
		return std::sqrt(x * x + y * y);
	}

	void truncate(double length) {
		double angle = atan2f(y, x);
		x = length * cos(angle);
		y = length * sin(angle);
	}

	static float dot(vec2 v1, vec2 v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}
	static float cross(vec2 v1, vec2 v2) {
		return (v1.x * v2.y) - (v1.y * v2.x);
	}

};

int main()
{
    bool boostUsed = false;
    bool firstTurn = true;
    bool shieldUsed = false;
    // game loop
    int lastDistance = 0;
    while (1) {
        int x;
        int y;
        int nextCheckpointX; // x position of the next check point
        int nextCheckpointY; // y position of the next check point
        int nextCheckpointDist; // distance to the next checkpoint
        int nextCheckpointAngle; // angle between your pod orientation and the direction of the next checkpoint
        cin >> x >> y >> nextCheckpointX >> nextCheckpointY >> nextCheckpointDist >> nextCheckpointAngle; cin.ignore();
        int opponentX;
        int opponentY;
        cin >> opponentX >> opponentY; cin.ignore();

        vec2<int> Position = vec2<int>(x,y);
        vec2<int> Checkpoint = vec2<int>(nextCheckpointX,nextCheckpointY);
        vec2<int> Opponent = vec2<int>(opponentX,opponentY);

        int distance = Position.dist(Opponent);

        vec2<int> tmp = Checkpoint - Position;
        tmp.truncate(tmp.length()-600);
        vec2<int> Target = Position + tmp;


        string thurst =nextCheckpointDist > 1500 ?"100":"40";
        thurst = (!boostUsed && nextCheckpointDist > 5000 && nextCheckpointAngle == 0) ?"BOOST":thurst;
        thurst = (nextCheckpointAngle > 75 || nextCheckpointAngle < -75) ? "40" : thurst;

        if(lastDistance > distance && !shieldUsed && distance - (lastDistance - distance) < 800 && (lastDistance - distance) > 100){
            thurst = "SHIELD";
        }
        if(thurst == "SHIELD") shieldUsed = true;
        if(thurst == "BOOST") boostUsed = true;
        cout << Target.x << " " << Target.y << " " << thurst<< endl;
        firstTurn = false;
        lastDistance = distance;
    }
}